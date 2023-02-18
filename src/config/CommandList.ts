import { ping } from "../commands/ping";
import { enkaCharacter } from "../enka/commands/character";
import { profile } from "../enka/commands/profile";
import { Command } from "../interface/Command";
import { register } from "../mongo/commands/register";

export const CommandList:Command[] = [
    ping,
    enkaCharacter,
    register,
    profile,
]