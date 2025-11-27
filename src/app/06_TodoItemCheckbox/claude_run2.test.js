import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a checkbox input', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox).toBeTruthy();
      expect(checkbox.type).toBe('checkbox');
    });

    it('should have the toggle class on the checkbox', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox.classList.contains('toggle')).toBe(true);
    });

    it('should render checkbox as unchecked by default', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox.checked).toBe(false);
    });

    it('should render checkbox as checked when isChecked is true', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox.checked).toBe(true);
    });

    it('should render checkbox as unchecked when isChecked is false', () => {
      component.isChecked = false;
      fixture.detectChanges();
      
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('Props/Inputs', () => {
    it('should have default isChecked value of false', () => {
      const newFixture = TestBed.createComponent(TodoItemCheckboxComponent);
      const newComponent = newFixture.componentInstance;
      expect(newComponent.isChecked).toBe(false);
    });

    it('should accept isChecked input as true', () => {
      component.isChecked = true;
      expect(component.isChecked).toBe(true);
    });

    it('should accept isChecked input as false', () => {
      component.isChecked = false;
      expect(component.isChecked).toBe(false);
    });

    it('should reflect isChecked input changes in the DOM', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      let checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox.checked).toBe(true);

      component.isChecked = false;
      fixture.detectChanges();
      
      checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('User Interactions', () => {
    it('should toggle isChecked from false to true when checkbox is clicked', () => {
      component.isChecked = false;
      fixture.detectChanges();
      
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      checkbox.click();
      
      expect(component.isChecked).toBe(true);
    });

    it('should toggle isChecked from true to false when checkbox is clicked', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      checkbox.click();
      
      expect(component.isChecked).toBe(false);
    });

    it('should toggle checkbox multiple times correctly', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      expect(component.isChecked).toBe(false);
      
      checkbox.click();
      expect(component.isChecked).toBe(true);
      
      checkbox.click();
      expect(component.isChecked).toBe(false);
      
      checkbox.click();
      expect(component.isChecked).toBe(true);
    });

    it('should update the DOM after clicking', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      checkbox.click();
      fixture.detectChanges();
      
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('toggleCheckbox method', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should toggle isChecked from false to true', () => {
      component.isChecked = false;
      component.toggleCheckbox();
      expect(component.isChecked).toBe(true);
    });

    it('should toggle isChecked from true to false', () => {
      component.isChecked = true;
      component.toggleCheckbox();
      expect(component.isChecked).toBe(false);
    });

    it('should log to console when toggled to true', () => {
      component.isChecked = false;
      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);
    });

    it('should log to console when toggled to false', () => {
      component.isChecked = true;
      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);
    });

    it('should call console.log exactly once per toggle', () => {
      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      
      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('State Changes', () => {
    it('should maintain state after multiple toggles', () => {
      component.isChecked = false;
      
      component.toggleCheckbox();
      expect(component.isChecked).toBe(true);
      
      component.toggleCheckbox();
      expect(component.isChecked).toBe(false);
      
      component.toggleCheckbox();
      expect(component.isChecked).toBe(true);
      
      component.toggleCheckbox();
      expect(component.isChecked).toBe(false);
    });

    it('should sync component state with DOM state', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      component.toggleCheckbox();
      fixture.detectChanges();
      expect(checkbox.checked).toBe(component.isChecked);
      
      component.toggleCheckbox();
      fixture.detectChanges();
      expect(checkbox.checked).toBe(component.isChecked);
    });
  });
});