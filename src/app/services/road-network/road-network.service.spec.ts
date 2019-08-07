import { TestBed } from '@angular/core/testing';

import { RoadNetworkService } from './road-network.service';

describe('RoadNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoadNetworkService = TestBed.get(RoadNetworkService);
    expect(service).toBeTruthy();
  });
});
