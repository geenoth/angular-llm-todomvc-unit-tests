import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;
  let checkboxElement: HTMLInputElement;

  beforeEach(async () => {
    // Configure the testing module for the standalone component
    await TestBed.configureTestingModule({
      imports: [TodoItemCheckboxComponent],
    }).compileComponents();

    // Create the component fixture and instance
    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;

    // Get the native checkbox element using its data-testid
    checkboxElement = fixture.nativeElement.querySelector(
      '[data-testid="todo-item-checkbox"]'
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render an unchecked checkbox by default', () => {
      fixture.detectChanges(); // Trigger initial data binding
      expect(checkboxElement).not.toBeNull();
      expect(checkboxElement.checked).toBe(false);
    });

    it('should render a checked checkbox when isChecked input is true', () => {
      component.isChecked = true;
      fixture.detectChanges(); // Update the view with the new input value
      expect(checkboxElement.checked).toBe(true);
    });

    it('should render an unchecked checkbox when isChecked input is false', () => {
      component.isChecked = false;
      fixture.detectChanges();
      expect(checkboxElement.checked).toBe(false);
    });
  });

  describe('User Interaction', () => {
    it('should call toggleCheckbox() method when the checkbox is clicked', () => {
      const toggleCheckboxSpy = jest.spyOn(component, 'toggleCheckbox');
      fixture.detectChanges();

      checkboxElement.click();

      expect(toggleCheckboxSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('State Changes and Props', () => {
    it('should toggle the isChecked property from false to true on click', () => {
      component.isChecked = false;
      fixture.detectChanges();

      expect(component.isChecked).toBe(false);
      expect(checkboxElement.checked).toBe(false);

      // Simulate a click
      checkboxElement.click();
      fixture.detectChanges();

      // Verify the state and view have updated
      expect(component.isChecked).toBe(true);
      expect(checkboxElement.checked).toBe(true);
    });

    it('should toggle the isChecked property from true to false on click', () => {
      component.isChecked = true;
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
      expect(checkboxElement.checked).toBe(true);

      // Simulate a click
      checkboxElement.click();
      fixture.detectChanges();

      // Verify the state and view have updated
      expect(component.isChecked).toBe(false);
      expect(checkboxElement.checked).toBe(false);
    });

    it('should log the correct status to the console when toggled', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      fixture.detectChanges();

      // First click (false -> true)
      checkboxElement.click();
      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);

      // Second click (true -> false)
      checkboxElement.click();
      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);

      // Clean up the spy
      consoleSpy.mockRestore();
    });
  });
});