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
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button if isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.clear-completed'));
    expect(buttonElement).toBeTruthy();
  });

  it('should not render the button if isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.clear-completed'));
    expect(buttonElement).toBeFalsy();
  });

  it('should call clearCompleted() and log "Completed todos cleared" when button is clicked', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const buttonElement = fixture.debugElement.query(By.css('.clear-completed')).nativeElement;
    buttonElement.click();
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Completed todos cleared');
    consoleLogSpy.mockRestore();
  });
});