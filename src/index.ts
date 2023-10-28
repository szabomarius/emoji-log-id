import { NO_ID_SYMBOL } from "./config/config";
import { LogOptions, MojiLogger } from "./types/types";
import { EmojiAssigner } from "./core/emoji-assigner";

let mojiAssigner = new EmojiAssigner(new Map());

function log({id , customEmoji}: LogOptions, message?: any, ...optionalParams: any[]): void {
    let emoji: string;
    if (customEmoji && typeof customEmoji === 'string') {
        emoji = mojiAssigner.assignEmojiForId(id, customEmoji);
    } else {
        emoji = mojiAssigner.assignEmojiForId(id);
    }
    if (typeof message === 'string') {
        // If it's a string we need to use the first argument as the message
        // because of color coding
        console.log(`${emoji} ${message}`, ...optionalParams);
    } else {
        console.log(emoji, message, ...optionalParams);
    }
}

export const mojilogger: MojiLogger = {
    withId: (id: any, customEmoji?: string) => {
        return {
            log: log.bind(null, {id, customEmoji})
        }
    },
    log: log.bind(null, {id: NO_ID_SYMBOL, customEmoji: '💬'}),
    getMojiMap: () => {
        return mojiAssigner.getEmojiMap();
    },
    setMojiList: (emojiList: string[]) => {
        mojiAssigner.setEmojiList(emojiList);
    },
    getMojiList: () => {
        return mojiAssigner.getEmojiList();
    },
    resetAll: () => {
        mojiAssigner = new EmojiAssigner(new Map());
    }
};
export type { MojiLog } from './types/types';