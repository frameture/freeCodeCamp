import { TestBed, inject } from '@angular/core/testing';
import { CampersService } from './campers.service';

describe('CampersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampersService]
    });
  });

  it('should ...', inject([CampersService], (service: CampersService) => {
    expect(service).toBeTruthy();
  }));
});
