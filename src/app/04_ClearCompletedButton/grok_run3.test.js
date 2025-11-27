import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';
import { By } from '@angular/platform-browser';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearCompletedButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClearCompletedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
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
    expect(button).toBeFalsy();
  });

  it('should call clearCompleted method on button click', () => {
    spyOn(component, 'clearCompleted').and.callThrough();
    spyOn(console, 'log'); // Mock console.log to avoid actual logging in tests
    component.isVisible = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    button.triggerEventHandler('click', null);
    expect(component.clearCompleted).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Completed todos cleared');
  });

  it('should have correct class on button', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    expect(button.nativeElement.classList).toContain('clear-completed');
  });
});