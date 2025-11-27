import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';
import { By } from '@angular/platform-browser';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearCompletedButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearCompletedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the button when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe('Clear Completed');
  });

  it('should not render the button when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    expect(button).toBeNull();
  });

  it('should call clearCompleted method when the button is clicked', () => {
    jest.spyOn(component, 'clearCompleted');
    component.isVisible = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    button.nativeElement.click();
    expect(component.clearCompleted).toHaveBeenCalled();
  });

  it('should log "Completed todos cleared" to the console on button click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    component.isVisible = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    button.nativeElement.click();
    expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
    consoleSpy.mockRestore();
  });
});