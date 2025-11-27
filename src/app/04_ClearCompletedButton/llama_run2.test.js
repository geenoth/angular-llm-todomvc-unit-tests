import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClearCompletedButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearCompletedButtonComponent);
    component = fixture.componentInstance;
  });

  it('renders button when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    expect(buttonElement.nativeElement.textContent).toBe('Clear Completed');
  });

  it('does not render button when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    expect(buttonElement).toBeNull();
  });

  it('calls clearCompleted on click', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    const clearCompletedSpy = jest.spyOn(component, 'clearCompleted');
    buttonElement.nativeElement.click();
    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
  });
});