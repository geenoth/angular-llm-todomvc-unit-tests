import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearCompletedButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
    fixture = TestBed.createComponent(ClearCompletedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render clear completed button when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const clearCompletedButton = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    expect(clearCompletedButton.nativeElement.textContent).toBe('Clear Completed');
  });

  it('should not render clear completed button when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const clearCompletedButton = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    expect(clearCompletedButton).toBeNull();
  });

  it('should call clearCompleted on click', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const clearCompletedButton = fixture.debugElement.query(By.css('[data-testid="clear-completed-button"]'));
    clearCompletedButton.nativeElement.click();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Completed todos cleared');
  });
});