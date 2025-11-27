import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestroyButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
  });

  // Test 1: Component should render correctly
  it('should create and render the destroy button', () => {
    expect(component).toBeTruthy();
    expect(button).toBeTruthy();
    expect(button.tagName).toBe('BUTTON');
    expect(button.classList).toContain('destroy');
  });

  // Test 2: Test click interaction
  it('should call removeTodo when the button is clicked', () => {
    // Spy on the component's removeTodo method
    jest.spyOn(component, 'removeTodo');

    // Simulate a click on the button
    button.click();

    // Expect the removeTodo method to have been called
    expect(component.removeTodo).toHaveBeenCalled();
    expect(component.removeTodo).toHaveBeenCalledTimes(1);
  });

  // Test 3: Test the implementation of the removeTodo method
  it('should log to the console when removeTodo is called', () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log');

    // Call the method directly
    component.removeTodo();

    // Expect console.log to have been called with the specific message
    expect(consoleSpy).toHaveBeenCalledWith('Todo removed');
    expect(consoleSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    consoleSpy.mockRestore();
  });
});