import { TestBed, inject } from '@angular/core/testing';

import { SubjectDataService } from './subject-data.service';

describe('SubjectDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectDataService]
    });
  });

  it('should be created', inject([SubjectDataService], (service: SubjectDataService) => {
    expect(service).toBeTruthy();
  }));
});
