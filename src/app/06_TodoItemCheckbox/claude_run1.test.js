import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a checkbox input element', () => {
      const inputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
      expect(inputElement).toBeTruthy();
    });

    it('should have the correct data-testid attribute', () => {
      const inputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(inputElement).toBeTruthy();
    });

    it('should have the toggle class', () => {
      const inputElement = fixture.nativeElement.querySelector('input.toggle');
      expect(inputElement).toBeTruthy();
    });

    it('should render checkbox as unchecked by default', () => {
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(inputElement.checked).toBe(false);
    });
  });

  describe('Props/Inputs', () => {
    it('should have isChecked default to false', () => {
      expect(component.isChecked).toBe(false);
    });

    it('should render checkbox as checked when isChecked is true', () => {
      component.isChecked = true;
      fixture.detectChanges();

      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(inputElement.checked).toBe(true);
    });

    it('should render checkbox as unchecked when isChecked is false', () => {
      component.isChecked = false;
      fixture.detectChanges();

      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(inputElement.checked).toBe(false);
    });

    it('should accept isChecked input as true', () => {
      component.isChecked = true;
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
    });
  });

  describe('User Interactions', () => {
    it('should toggle isChecked from false to true on click', () => {
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      expect(component.isChecked).toBe(false);
      
      inputElement.click();
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
    });

    it('should toggle isChecked from true to false on click', () => {
      component.isChecked = true;
      fixture.detectChanges();

      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      inputElement.click();
      fixture.detectChanges();

      expect(component.isChecked).toBe(false);
    });

    it('should toggle multiple times correctly', () => {
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      expect(component.isChecked).toBe(false);
      
      inputElement.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);

      inputElement.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(false);

      inputElement.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);
    });

    it('should log message to console when toggled', () => {
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      inputElement.click();
      fixture.detectChanges();

      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);
    });

    it('should log correct state when toggling from true to false', () => {
      component.isChecked = true;
      fixture.detectChanges();

      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      inputElement.click();
      fixture.detectChanges();

      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);
    });
  });

  describe('State Changes', () => {
    it('should update the checked attribute when isChecked changes', () => {
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      
      expect(inputElement.checked).toBe(false);

      component.isChecked = true;
      fixture.detectChanges();

      expect(inputElement.checked).toBe(true);
    });

    it('should reflect state change after toggleCheckbox is called directly', () => {
      expect(component.isChecked).toBe(false);

      component.toggleCheckbox();
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
    });

    it('should log to console when toggleCheckbox is called directly', () => {
      component.toggleCheckbox();

      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);
    });
  });

  describe('toggleCheckbox method', () => {
    it('should toggle isChecked value', () => {
      expect(component.isChecked).toBe(false);
      
      component.toggleCheckbox();
      expect(component.isChecked).toBe(true);
      
      component.toggleCheckbox();
      expect(component.isChecked).toBe(false);
    });

    it('should call console.log with correct arguments', () => {
      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);

      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);
    });
  });
});