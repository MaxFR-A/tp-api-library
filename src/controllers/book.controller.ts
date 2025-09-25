import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {BookDTO} from "../dto/book.dto";
import {bookService} from "../services/book.service";
import {CustomError} from "../middlewares/errorHandler";
import {Book} from "../models/book.model";
import {BookCopyDTO} from "../dto/bookCopy.dto";
import {bookCopyService} from "../services/bookCopy.service";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
    @Get("/")
    public async getAllBooks(): Promise<BookDTO[]> {
        return bookService.getAllBooks();
    }

    // Récupère un livre par ID
    @Get("/{id}")
    public async getBookById(@Path() id: number): Promise<BookDTO | null> {
        const book: Book | null = await bookService.getBookById(id);
        if (!book) {
            let error: CustomError = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        return book;
    }

    // Crée un nouveau livre
    @Post("/")
    public async createBook(
        @Body() requestBody: BookDTO
    ): Promise<BookDTO> {
        const {
            title,
            publishYear,
            author,
            isbn
        } = requestBody;
        return bookService.createBook(title, publishYear, author, isbn);
    }

    // Met à jour un livre par ID
    @Patch("{id}")
    public async updateBook(
        @Path() id: number,
        @Body() requestBody: BookDTO
    ): Promise<BookDTO | null> {
        const {title, publishYear, author, isbn} = requestBody;
        const book: Book | null = await bookService.updateBook(id, title, publishYear, author, isbn);
        if (!book) {
            let error: CustomError = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        return book;
    }

    // Supprime un livre par ID
    @Delete("{id}")
    public async deleteBook(@Path() id: number): Promise<void> {
        await bookService.deleteBook(id);
    }

    // Récupère les copies d'un livre par ID
    @Get("/{id}/bookCopys")
    public async getBookBookCopysById(@Path() id: number): Promise<BookCopyDTO[] | null> {
        const book: Book | null = await bookService.getBookById(id);
        if (!book) {
            let error: CustomError = new Error("Book not found");
            error.status = 404;
            throw error;
        }

        return bookCopyService.getBookCopysByBookId(id);
    }
}