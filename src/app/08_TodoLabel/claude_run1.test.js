import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  let component: TodoLabelComponent;
  let fixture: ComponentFixture<TodoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render label element with data-testid', () => {
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement).toBeTruthy();
    });

    it('should render with default empty text', () => {
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.textContent.trim()).toBe('');
    });

    it('should render with provided text', () => {
      component.text = 'Buy groceries';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.textContent.trim()).toBe('Buy groceries');
    });

    it('should render with different text values', () => {
      const testTexts = ['Task 1', 'Complete homework', 'Call mom', ''];

      testTexts.forEach((text) => {
        component.text = text;
        fixture.detectChanges();

        const labelElement = fixture.debugElement.query(
          By.css('[data-testid="todo-label"]')
        );
        expect(labelElement.nativeElement.textContent.trim()).toBe(text);
      });
    });
  });

  describe('props and state', () => {
    it('should have default text as empty string', () => {
      expect(component.text).toBe('');
    });

    it('should have default isCompleted as false', () => {
      expect(component.isCompleted).toBe(false);
    });

    it('should update text input', () => {
      component.text = 'New todo item';
      expect(component.text).toBe('New todo item');
    });

    it('should update isCompleted input', () => {
      component.isCompleted = true;
      expect(component.isCompleted).toBe(true);
    });
  });

  describe('completed class', () => {
    it('should not have completed class when isCompleted is false', () => {
      component.isCompleted = false;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });

    it('should have completed class when isCompleted is true', () => {
      component.isCompleted = true;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should toggle completed class when isCompleted changes', () => {
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

      component.isCompleted = false;
      fixture.detectChanges();
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);

      component.isCompleted = true;
      fixture.detectChanges();
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);

      component.isCompleted = false;
      fixture.detectChanges();
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });
  });

  describe('user interactions', () => {
    it('should call startEdit on double click', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

      labelElement.triggerEventHandler('dblclick', null);

      expect(consoleSpy).toHaveBeenCalledWith('Edit started');
      consoleSpy.mockRestore();
    });

    it('should call startEdit method when double clicked', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalled();
      expect(startEditSpy).toHaveBeenCalledTimes(1);
    });

    it('should call startEdit multiple times on multiple double clicks', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

      labelElement.triggerEventHandler('dblclick', null);
      labelElement.triggerEventHandler('dblclick', null);
      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalledTimes(3);
    });

    it('should not trigger startEdit on single click', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

      labelElement.triggerEventHandler('click', null);

      expect(startEditSpy).not.toHaveBeenCalled();
    });
  });

  describe('startEdit method', () => {
    it('should log "Edit started" to console', () => {
      const consoleSpy = jest.spyOn(console, 'log');

      component.startEdit();

      expect(consoleSpy).toHaveBeenCalledWith('Edit started');
      consoleSpy.mockRestore();
    });

    it('should be callable directly', () => {
      expect(() => component.startEdit()).not.toThrow();
    });
  });

  describe('combined scenarios', () => {
    it('should render completed todo with text correctly', () => {
      component.text = 'Completed task';
      component.isCompleted = true;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

      expect(labelElement.nativeElement.textContent.trim()).toBe('Completed task');
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should render incomplete todo with text correctly', () => {
      component.text = 'Pending task';
      component.isCompleted = false;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

      expect(labelElement.nativeElement.textContent.trim()).toBe('Pending task');
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });

    it('should handle double click on completed item', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      component.text = 'Completed task';
      component.isCompleted = true;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalled();
    });

    it('should handle double click on incomplete item', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      component.text = 'Pending task';
      component.isCompleted = false;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalled();
    });
  });
});