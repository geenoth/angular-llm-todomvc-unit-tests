import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;
  let checkboxElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemCheckboxComponent], // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    // Query for the checkbox element using its data-testid attribute
    checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="todo-item-checkbox"]')
    ).nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render an input element with type "checkbox"', () => {
      expect(checkboxElement).not.toBeNull();
      expect(checkboxElement.type).toBe('checkbox');
    });

    it('should render unchecked by default', () => {
      expect(component.isChecked).toBe(false);
      expect(checkboxElement.checked).toBe(false);
    });

    it('should render checked when isChecked input is true', () => {
      component.isChecked = true;
      fixture.detectChanges();
      expect(checkboxElement.checked).toBe(true);
    });

    it('should render unchecked when isChecked input is false', () => {
      component.isChecked = false;
      fixture.detectChanges();
      expect(checkboxElement.checked).toBe(false);
    });
  });

  describe('User Interaction and State Changes', () => {
    it('should call toggleCheckbox() when the checkbox is clicked', () => {
      const toggleCheckboxSpy = jest.spyOn(component, 'toggleCheckbox');
      checkboxElement.click();
      expect(toggleCheckboxSpy).toHaveBeenCalledTimes(1);
    });

    it('should toggle isChecked property from false to true on click', () => {
      expect(component.isChecked).toBe(false);
      checkboxElement.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);
      expect(checkboxElement.checked).toBe(true);
    });

    it('should toggle isChecked property from true to false on click', () => {
      // Set initial state to checked
      component.isChecked = true;
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);
      expect(checkboxElement.checked).toBe(true);

      // Trigger the click to toggle
      checkboxElement.click();
      fixture.detectChanges();

      // Assert the new state
      expect(component.isChecked).toBe(false);
      expect(checkboxElement.checked).toBe(false);
    });

    it('should log the new state to the console when toggled', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  
        // Toggle from false to true
        checkboxElement.click();
        fixture.detectChanges();
        expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);
  
        // Toggle from true to false
        checkboxElement.click();
        fixture.detectChanges();
        expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);
  
        // Clean up the spy
        consoleSpy.mockRestore();
      });
  });
});