import { Command } from 'commander';
import { Observable } from 'rxjs';
import camelCase from 'camel-case';

export default class ObservableCommand extends Command {
  constructor(command) {
    super();
    // convert commander Command to ObservableCommand
    if (command instanceof Command) {
      Object.getOwnPropertyNames(command).forEach(prop => {
        this[prop] = command[prop];
      });
    }
  }

  command() {
    // register command with commander
    const _command = super.command(...arguments);
    // return ObservableCommand instead of Command
    return new ObservableCommand(_command);
  }

  observe() {
    return Observable.create(observer => {
      // when action runs, next and complete observer
      this.action(function () {
        // fetch command from end of arguments
        const command = arguments[arguments.length - 1];

        // parse args providing a camel case list
        const args = {};
        command._args.forEach((arg, i) => {
          const name = camelCase(arg.name);
          args[name] = arguments[i];
        });

        // parse options providing a camel case list
        const options = {};
        command.options.map(option => option.long)
          // remove flag dashes
          .map(option => option.replace(/^(--|-)/, ''))
          // convert to camel case
          .map(camelCase)
          // capitalize if one character
          .map(option => {
            return option.length === 1 ? option.toUpperCase() : option;
          })
          // match option to those stored in 'command'
          .forEach(option => {
            options[option] = command[option];
          });

        // pass args, options, and original observable command
        observer.next({ args, options, command });
        observer.complete();
      });
    });
  }
}
