import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';
import { By } from '@angular/platform-browser';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearCompletedButtonComponent],
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

    const buttonElement = fixture.debugElement.query(
      By.css('[data-testid="clear-completed-button"]')
    );
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Clear Completed');
  });

  it('should not render the button when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(
      By.css('[data-testid="clear-completed-button"]')
    );
    expect(buttonElement).toBeNull();
  });

  it('should call clearCompleted when the button is clicked', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const spy = jest.spyOn(component, 'clearCompleted');
    const buttonElement = fixture.debugElement.query(
      By.css('[data-testid="clear-completed-button"]')
    );

    buttonElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should log a message when clearCompleted is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    component.clearCompleted();
    expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');

    consoleSpy.mockRestore();
  });
});