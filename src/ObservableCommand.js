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

        // parse args providing a camelCased list
        const args = {};
        command._args.forEach((arg, i) => {
          const name = camelCase(arg.name);
          args[name] = arguments[i];
        });

        // parse options providing a camelCased list
        const options = {};
        Object.keys(command).filter(key => {
          // Commander reserved words
          switch (key) {
            case 'commands':
            case 'options':
            case 'parent':
              return false;
          }
          // dont include private variables
          if (key[0] === '_')
            return false;
          // allow remaining words
          return true;
        })
          .forEach(key => {
            // add option and value to options
            options[key] = command[key];
          });

        // pass args, options, and original observable command
        observer.next({ args, options, command });
        observer.complete();
      });
    });
  }
}
