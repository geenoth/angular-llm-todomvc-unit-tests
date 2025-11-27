import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';
import { By } from '@angular/platform-browser';

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestroyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button correctly', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('[data-testid="destroy-button"]')
    );
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.classList).toContain('destroy');
  });

  it('should call removeTodo when button is clicked', () => {
    const spy = jest.spyOn(component, 'removeTodo');
    const buttonElement = fixture.debugElement.query(
      By.css('[data-testid="destroy-button"]')
    );

    buttonElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should log message when removeTodo is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    component.removeTodo();
    expect(consoleSpy).toHaveBeenCalledWith('Todo removed');

    consoleSpy.mockRestore();
  });

  it('should handle multiple clicks correctly', () => {
    const spy = jest.spyOn(component, 'removeTodo');
    const buttonElement = fixture.debugElement.query(
      By.css('[data-testid="destroy-button"]')
    );

    buttonElement.nativeElement.click();
    buttonElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(2);
  });
});