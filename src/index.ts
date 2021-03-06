import { Client, Collection, Structures } from "discord.js";
import { CommandHandler } from "./handlers/CommandHandler";
import Slasherror from "./utilities/extras/error";
import Slashcmds from "./utilities/slash";
import { ActionRow } from "./utilities/buttons/ActionRow";
import { MessageButton } from "./utilities/buttons/MessageButton";
import { Command } from "./utilities/command";
import { awaitButtons } from "./utilities/buttons/awaitButtons";

type SlashcordOptions = {
  useComponents?: boolean | undefined;
  testServers?: string[] | undefined;
  botOwners?: string[] | undefined;
  cooldownError?: string | undefined;
  permissionError?: string | undefined;
  devError?: string | undefined;
};

class Slashcord {
  static Command = Command;
  static ActionRow = ActionRow;
  static MessageButton = MessageButton;
  static awaitButtons = awaitButtons;

  private _client: Client;

  private _commandsDir = "./commands";
  private _featuresDir = "";

  private _testServers: string[] | undefined = [];
  private _botOwners: string[] | undefined = [];
  private _useComponents: boolean | undefined = false;

  public commands: Collection<string, Command> = new Collection();
  public cooldowns: Collection<string, any> = new Collection();

  private _slash: Slashcmds;
  private _command: CommandHandler;

  public cooldownMsg: string | undefined =
    "Please wait {COOLDOWN} before using that.";
  public permissionMsg: string | undefined =
    "You need the {PERMISSION} permission.";
  public devOnlyMsg: string | undefined =
    "You must a developer to use this command.";

  constructor(client: Client, commandsDir: string, options: SlashcordOptions) {
    if (!client) {
      throw new Slasherror(
        "Please provide a Discord.js client in the first argument."
      );
    }

    this._client = client;
    this._commandsDir = commandsDir || this._commandsDir;

    if (!commandsDir) {
      console.warn(
        'Slashcord >> There was no commands directory provided, using "./commands"'
      );
    }

    this._slash = new Slashcmds(this);
    this._command = new CommandHandler(this, this._commandsDir);
    if (options && "testServers" in options)
      this._testServers = options.testServers;
    if (options && "botOwners" in options) this._botOwners = options.botOwners;
    if (options && "cooldownError" in options)
      this.cooldownMsg = options.cooldownError;
    if (options && "permissionError" in options)
      this.permissionMsg = options.permissionError;
    if (options && "devError" in options) this.devOnlyMsg = options.devError;
    if (options && "useComponents" in options)
      this._useComponents = options.useComponents;
  }

  public get client(): Client {
    return this._client;
  }

  public get testServers() {
    return this._testServers;
  }

  public get botOwners() {
    return this._botOwners;
  }

  public get slashCmds() {
    return this._slash;
  }
}

export default Slashcord;
export { Command, MessageButton, ActionRow, awaitButtons };
