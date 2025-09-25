import {AuthorDTO} from "./author.dto";

export interface BookDTO {
    id?: number;
    title: string;
    publishYear: number;
    author?: AuthorDTO;
    isbn: string;
}
