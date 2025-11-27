import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearCompletedButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearCompletedButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(
      By.css('[data-testid="clear-completed-button"]')
    );
    expect(button).not.toBeNull();
    expect(button.nativeElement.textContent).toContain('Clear Completed');
  });

  it('should not display the button when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(
      By.css('[data-testid="clear-completed-button"]')
    );
    expect(button).toBeNull();
  });

  it('should call clearCompleted method when the button is clicked', () => {
    component.isVisible = true;
    fixture.detectChanges();
    jest.spyOn(component, 'clearCompleted');
    const button = fixture.debugElement.query(
      By.css('[data-testid="clear-completed-button"]')
    );
    button.triggerEventHandler('click', null);
    expect(component.clearCompleted).toHaveBeenCalled();
  });

  it('should log a message to the console when clearCompleted is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.clearCompleted();
    expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
  });
});