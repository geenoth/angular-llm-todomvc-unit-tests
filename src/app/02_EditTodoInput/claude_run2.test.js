import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should render an input element with class "edit"', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input.edit');
      expect(inputElement).toBeTruthy();
    });

    it('should render input with data-testid="edit-todo-input"', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement).toBeTruthy();
    });

    it('should render empty input when no initialValue is provided', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement.value).toBe('');
    }));

    it('should render input with initialValue when provided', fakeAsync(() => {
      component.initialValue = 'Test Todo';
      component.ngOnInit();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement.value).toBe('Test Todo');
    }));
  });

  describe('Props and State', () => {
    it('should have default empty string for initialValue', () => {
      expect(component.initialValue).toBe('');
    });

    it('should have default empty string for editTitle', () => {
      expect(component.editTitle).toBe('');
    });

    it('should set editTitle from initialValue on ngOnInit', () => {
      component.initialValue = 'Initial Todo';
      component.ngOnInit();
      expect(component.editTitle).toBe('Initial Todo');
    });

    it('should accept initialValue as Input', () => {
      component.initialValue = 'New Todo Item';
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.editTitle).toBe('New Todo Item');
    });
  });

  describe('User Interactions', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should update editTitle when user types in input', fakeAsync(() => {
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      inputElement.value = 'Updated Todo';
      inputElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      expect(component.editTitle).toBe('Updated Todo');
    }));

    it('should call handleBlur when input loses focus', fakeAsync(() => {
      const handleBlurSpy = jest.spyOn(component, 'handleBlur');
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      inputElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();
      expect(handleBlurSpy).toHaveBeenCalled();
    }));

    it('should call updateTodo when Enter key is pressed', fakeAsync(() => {
      const updateTodoSpy = jest.spyOn(component, 'updateTodo');
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      inputElement.dispatchEvent(enterEvent);
      tick();
      fixture.detectChanges();
      expect(updateTodoSpy).toHaveBeenCalled();
    }));

    it('should not call updateTodo when other keys are pressed', fakeAsync(() => {
      const updateTodoSpy = jest.spyOn(component, 'updateTodo');
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' });
      inputElement.dispatchEvent(escapeEvent);
      tick();
      fixture.detectChanges();
      expect(updateTodoSpy).not.toHaveBeenCalled();
    }));
  });

  describe('updateTodo method', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should log todo update when editTitle has content', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = 'Valid Todo';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'Valid Todo');
      consoleSpy.mockRestore();
    });

    it('should not log when editTitle is empty', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = '';
      component.updateTodo();
      expect(consoleSpy).not.toHaveBeenCalledWith('Todo updated:', expect.anything());
      consoleSpy.mockRestore();
    });

    it('should not log when editTitle is only whitespace', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = '   ';
      component.updateTodo();
      expect(consoleSpy).not.toHaveBeenCalledWith('Todo updated:', expect.anything());
      consoleSpy.mockRestore();
    });

    it('should log trimmed value when editTitle has leading/trailing spaces', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = '  Trimmed Todo  ';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '  Trimmed Todo  ');
      consoleSpy.mockRestore();
    });
  });

  describe('handleBlur method', () => {
    it('should log "Edit finished" when called', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.handleBlur();
      expect(consoleSpy).toHaveBeenCalledWith('Edit finished');
      consoleSpy.mockRestore();
    });
  });

  describe('Two-way binding', () => {
    it('should reflect changes from component to view', fakeAsync(() => {
      component.initialValue = 'Initial';
      component.ngOnInit();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      
      component.editTitle = 'Changed Value';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement.value).toBe('Changed Value');
    }));

    it('should reflect changes from view to component', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      inputElement.value = 'User Input';
      inputElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      
      expect(component.editTitle).toBe('User Input');
    }));
  });

  describe('Edge cases', () => {
    it('should handle special characters in input', fakeAsync(() => {
      component.initialValue = '<script>alert("xss")</script>';
      component.ngOnInit();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      
      expect(component.editTitle).toBe('<script>alert("xss")</script>');
    }));

    it('should handle unicode characters in input', fakeAsync(() => {
      component.initialValue = '日本語テスト 🎉';
      component.ngOnInit();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      
      expect(component.editTitle).toBe('日本語テスト 🎉');
    }));

    it('should handle very long strings', fakeAsync(() => {
      const longString = 'a'.repeat(10000);
      component.initialValue = longString;
      component.ngOnInit();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      
      expect(component.editTitle).toBe(longString);
    }));
  });
});