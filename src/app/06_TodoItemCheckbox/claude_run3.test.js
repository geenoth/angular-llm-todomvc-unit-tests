import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a checkbox input element', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      expect(checkbox).toBeTruthy();
      expect(checkbox.tagName.toLowerCase()).toBe('input');
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

  describe('Input properties', () => {
    it('should have default isChecked value of false', () => {
      expect(component.isChecked).toBe(false);
    });

    it('should accept isChecked input as true', () => {
      component.isChecked = true;
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
    });

    it('should accept isChecked input as false', () => {
      component.isChecked = false;
      fixture.detectChanges();

      expect(component.isChecked).toBe(false);
    });

    it('should reflect isChecked changes in the template', () => {
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

  describe('user interactions', () => {
    it('should toggle isChecked from false to true on click', () => {
      component.isChecked = false;
      fixture.detectChanges();

      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      checkbox.click();
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
    });

    it('should toggle isChecked from true to false on click', () => {
      component.isChecked = true;
      fixture.detectChanges();

      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
      checkbox.click();
      fixture.detectChanges();

      expect(component.isChecked).toBe(false);
    });

    it('should toggle isChecked multiple times on consecutive clicks', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');

      expect(component.isChecked).toBe(false);

      checkbox.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);

      checkbox.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(false);

      checkbox.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);
    });
  });

  describe('toggleCheckbox method', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = spyOn(console, 'log');
    });

    afterEach(() => {
      consoleSpy.and.stub();
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

    it('should log the checkbox state when toggled to true', () => {
      component.isChecked = false;

      component.toggleCheckbox();

      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);
    });

    it('should log the checkbox state when toggled to false', () => {
      component.isChecked = true;

      component.toggleCheckbox();

      expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);
    });

    it('should log on each toggle', () => {
      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledTimes(2);

      component.toggleCheckbox();
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('state synchronization', () => {
    it('should keep component state and DOM in sync after click', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');

      checkbox.click();
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
      expect(checkbox.checked).toBe(true);
    });

    it('should keep component state and DOM in sync after multiple clicks', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');

      checkbox.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(checkbox.checked);

      checkbox.click();
      fixture.detectChanges();
      expect(component.isChecked).toBe(checkbox.checked);
    });

    it('should update DOM when isChecked is programmatically changed', () => {
      const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');

      component.isChecked = true;
      fixture.detectChanges();
      expect(checkbox.checked).toBe(true);

      component.isChecked = false;
      fixture.detectChanges();
      expect(checkbox.checked).toBe(false);
    });
  });
});