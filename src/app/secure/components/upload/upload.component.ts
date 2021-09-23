import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  upload(e: Event): void {
    let input: any = <HTMLInputElement>e.target;
    let fileList: any = input.files;
    const file = fileList.item(0);
    const data = new FormData();
    data.append('image', file);
    this.http.post(`${environment.api}/upload`, data).subscribe((res: any) => {
      this.uploaded.emit(res.url);
    });
  }
}
