"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(_a) {
        var name = _a.name, execute = _a.execute, description = _a.description, category = _a.category, options = _a.options, testOnly = _a.testOnly, cooldown = _a.cooldown;
        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
        this.testOnly = testOnly;
        this.options = options;
        this.execute = execute;
        this.category = category;
    }
    return Command;
}());
exports.default = Command;
//# sourceMappingURL=SlashCommand.js.map