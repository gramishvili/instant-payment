import { Observable } from 'rxjs';
import { Status, StatusMap } from '../domain/status.model';

/**
 * Repository interface for Status operations
 * Following the Repository pattern from Clean Architecture
 */
export interface IStatusRepository {
  /**
   * Get all statuses
   * @returns Observable of Status array
   */
  getStatuses(): Observable<Status[]>;
  
  /**
   * Get a status by ID
   * @param id Status ID
   * @returns Observable of Status
   */
  getStatusById(id: string): Observable<Status>;
  
  /**
   * Get a mapping of status IDs to names for dropdown selections
   * @returns Observable of StatusMap (Record<string, string>)
   */
  getStatusMap(): Observable<StatusMap>;
}
