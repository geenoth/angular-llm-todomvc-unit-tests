import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DestroyButtonComponent } from './destroy-button.component';

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestroyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  // Test 1: Correct Rendering
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the destroy button', () => {
    const button = compiled.querySelector('[data-testid="destroy-button"]');
    expect(button).toBeTruthy();
    expect(button?.tagName).toBe('BUTTON');
    expect(button?.classList.contains('destroy')).toBe(true);
  });

  // Test 2: User Interactions
  it('should call the removeTodo method when the button is clicked', () => {
    // Spy on the component's method before the interaction
    const removeTodoSpy = jest.spyOn(component, 'removeTodo');

    // Find the button element using the data-testid
    const buttonDebugElement = fixture.debugElement.query(
      By.css('[data-testid="destroy-button"]')
    );

    // Simulate the click event
    buttonDebugElement.triggerEventHandler('click', null);

    // Assert that the spied method was called
    expect(removeTodoSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    removeTodoSpy.mockRestore();
  });

  // Test 3: Method Implementation (State Changes/Effects)
  it('should log a message to the console when removeTodo is called', () => {
    // Spy on the global console object's 'log' method
    const consoleLogSpy = jest.spyOn(console, 'log');

    // Directly call the method to test its internal logic
    component.removeTodo();

    // Assert that console.log was called with the expected message
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo removed');

    // Clean up the spy to avoid side effects in other tests
    consoleLogSpy.mockRestore();
  });
});