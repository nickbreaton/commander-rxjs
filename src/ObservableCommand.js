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

        // parse params providing a camelCased list
        const params = {};
        command._args.forEach((arg, i) => {
          const name = camelCase(arg.name);
          params[name] = arguments[i];
        });

        // continue
        observer.next({ params, command });
        observer.complete();
      });
    });
  }
}
