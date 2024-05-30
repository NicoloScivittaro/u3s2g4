import { Component, OnInit } from '@angular/core';
import { Photo, PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  favoriteCount: number = 0;
  errorMessage: string = '';

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
    this.photoService.favoriteCount$.subscribe(count => {
      this.favoriteCount = count;
    });
  }

  loadPhotos(): void {
    this.photoService.getPhotos().subscribe(
      (data) => this.photos = data,
      (error) => this.errorMessage = error
    );
  }

  deletePhoto(id: number): void {
    this.photoService.deletePhoto(id).subscribe(
      () => this.photos = this.photos.filter(photo => photo.id !== id),
      (error) => this.errorMessage = error
    );
  }

  likePhoto(): void {
    this.photoService.incrementFavoriteCount();
  }
}
