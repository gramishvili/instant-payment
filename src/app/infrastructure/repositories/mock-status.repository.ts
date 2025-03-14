import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Status, StatusMap, STATUSES } from '../../core/domain/status.model';
import { IStatusRepository } from '../../core/interfaces/status-repository.interface';

/**
 * Mock implementation of the Status Repository
 * Used for testing and development purposes
 */
@Injectable({
  providedIn: 'root'
})
export class MockStatusRepository implements IStatusRepository {
  // Using predefined statuses from the domain model
  private statuses: Status[] = STATUSES;

  /**
   * Get all statuses
   * @returns Observable of Status array
   */
  getStatuses(): Observable<Status[]> {
    // Simulate network delay
    return of(this.statuses).pipe(delay(300));
  }

  /**
   * Get a status by ID
   * @param id Status ID
   * @returns Observable of Status
   */
  getStatusById(id: string): Observable<Status> {
    const status = this.statuses.find(s => s.id === id);
    
    if (!status) {
      throw new Error(`Status with ID ${id} not found`);
    }
    
    // Simulate network delay
    return of(status).pipe(delay(200));
  }

  /**
   * Get a mapping of status IDs to names for dropdown selections
   * @returns Observable of StatusMap (Record<string, string>)
   */
  getStatusMap(): Observable<StatusMap> {
    const statusMap: StatusMap = {};
    
    this.statuses.forEach(status => {
      statusMap[status.id] = status.name;
    });
    
    // Simulate network delay
    return of(statusMap).pipe(delay(200));
  }
}
