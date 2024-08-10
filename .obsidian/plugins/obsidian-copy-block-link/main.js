/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function generateId() {
    return Math.random().toString(36).substr(2, 6);
}
const illegalHeadingCharsRegex = /[!"#$%&()*+,.:;<=>?@^`{|}~\/\[\]\\]/g;
function sanitizeHeading(heading) {
    return heading
        .replace(illegalHeadingCharsRegex, " ")
        .replace(/\s+/g, " ")
        .trim();
}
function shouldInsertAfter(block) {
    if (block.type) {
        return [
            "blockquote",
            "code",
            "table",
            "comment",
            "footnoteDefinition",
        ].includes(block.type);
    }
}
class MyPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.registerEvent(this.app.workspace.on("editor-menu", (menu, editor, view) => {
                const block = this.getBlock(editor, view.file);
                if (!block)
                    return;
                const isHeading = !!block.heading;
                const onClick = (isEmbed) => {
                    if (isHeading) {
                        this.handleHeading(view.file, block, isEmbed);
                    }
                    else {
                        this.handleBlock(view.file, editor, block, isEmbed);
                    }
                };
                menu.addItem((item) => {
                    item
                        .setTitle(isHeading ? "Copy link to heading" : "Copy link to block")
                        .setIcon("links-coming-in")
                        .onClick(() => onClick(false));
                });
                menu.addItem((item) => {
                    item
                        .setTitle(isHeading ? "Copy heading embed" : "Copy block embed")
                        .setIcon("links-coming-in")
                        .onClick(() => onClick(true));
                });
            }));
            this.addCommand({
                id: "copy-link-to-block",
                name: "Copy link to current block or heading",
                editorCheckCallback: (isChecking, editor, view) => {
                    return this.handleCommand(isChecking, editor, view, false);
                },
            });
            this.addCommand({
                id: "copy-embed-to-block",
                name: "Copy embed to current block or heading",
                editorCheckCallback: (isChecking, editor, view) => {
                    return this.handleCommand(isChecking, editor, view, true);
                },
            });
        });
    }
    handleCommand(isChecking, editor, view, isEmbed) {
        if (isChecking) {
            return !!this.getBlock(editor, view.file);
        }
        const block = this.getBlock(editor, view.file);
        if (!block)
            return;
        const isHeading = !!block.heading;
        if (isHeading) {
            this.handleHeading(view.file, block, isEmbed);
        }
        else {
            this.handleBlock(view.file, editor, block, isEmbed);
        }
    }
    getBlock(editor, file) {
        const cursor = editor.getCursor("to");
        const fileCache = this.app.metadataCache.getFileCache(file);
        let block = ((fileCache === null || fileCache === void 0 ? void 0 : fileCache.sections) || []).find((section) => {
            return (section.position.start.line <= cursor.line &&
                section.position.end.line >= cursor.line);
        });
        if ((block === null || block === void 0 ? void 0 : block.type) === "list") {
            block = ((fileCache === null || fileCache === void 0 ? void 0 : fileCache.listItems) || []).find((item) => {
                return (item.position.start.line <= cursor.line &&
                    item.position.end.line >= cursor.line);
            });
        }
        else if ((block === null || block === void 0 ? void 0 : block.type) === "heading") {
            block = fileCache.headings.find((heading) => {
                return heading.position.start.line === block.position.start.line;
            });
        }
        return block;
    }
    handleHeading(file, block, isEmbed) {
        navigator.clipboard.writeText(`${isEmbed ? "!" : ""}${this.app.fileManager.generateMarkdownLink(file, "", "#" + sanitizeHeading(block.heading))}`);
    }
    handleBlock(file, editor, block, isEmbed) {
        const blockId = block.id;
        // Copy existing block id
        if (blockId) {
            return navigator.clipboard.writeText(`${isEmbed ? "!" : ""}${this.app.fileManager.generateMarkdownLink(file, "", "#^" + blockId)}`);
        }
        // Add a block id
        const sectionEnd = block.position.end;
        const end = {
            ch: sectionEnd.col,
            line: sectionEnd.line,
        };
        const id = generateId();
        const spacer = shouldInsertAfter(block) ? "\n\n" : " ";
        editor.replaceRange(`${spacer}^${id}`, end);
        navigator.clipboard.writeText(`${isEmbed ? "!" : ""}${this.app.fileManager.generateMarkdownLink(file, "", "#^" + id)}`);
    }
}

module.exports = MyPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxN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
