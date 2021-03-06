import { Book } from './../../../models/book';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  imageDirectoPath: any = 'http://localhost:8000/';
  page = 1;
  pageSize = 10;
  last_page=1;
  keyword='';
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.search();
  }

  search(){
    this.bookService.getAll(this.keyword,this.page).subscribe(res => {
      this.pageSize= res.per_page;
      this.page = res.current_page;
      this.last_page = res.last_page * res.per_page;
      this.books = res.data;
    })
  }
 
  delete(id: number){
    Swal.fire({
      title: 'Bạn có chắc?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.remove(id).subscribe((data) => {
          this.search();
        })
      }
    })
    
  }
}
