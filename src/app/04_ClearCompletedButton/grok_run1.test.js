import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';

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
    const buttonElement = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent.trim()).toBe('Clear Completed');
  });

  it('should not render the button when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
    expect(buttonElement).toBeFalsy();
  });

  it('should call clearCompleted method when button is clicked', () => {
    spyOn(component, 'clearCompleted').and.callThrough();
    component.isVisible = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
    buttonElement.click();
    expect(component.clearCompleted).toHaveBeenCalled();
  });

  it('should log message when clearCompleted is called', () => {
    spyOn(console, 'log');
    component.clearCompleted();
    expect(console.log).toHaveBeenCalledWith('Completed todos cleared');
  });
});