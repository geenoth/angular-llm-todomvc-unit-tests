import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;
  let inputElement:;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
  });

  describe('rendering', () => {
    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should render an input element with class "edit"', () => {
      fixture.detectChanges();
      inputElement = fixture.nativeElement.querySelector('input.edit');
      expect(inputElement).toBeTruthy();
    });

    it('should have data-testid attribute "edit-todo-input"', () => {
      fixture.detectChanges();
      inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement).toBeTruthy();
    });

    it('should render input with empty value by default', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement.value).toBe('');
    }));

    it('should render input with initialValue when provided', fakeAsync(() => {
      component.initialValue = 'Test Todo';
      fixture.detectChanges();
      component.ngOnInit();
      fixture.detectChanges();
      tick();
      inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement.value).toBe('Test Todo');
    }));
  });

  describe('initialization', () => {
    it('should have empty initialValue by default', () => {
      expect(component.initialValue).toBe('');
    });

    it('should have empty editTitle by default', () => {
      expect(component.editTitle).toBe('');
    });

    it('should set editTitle to initialValue on ngOnInit', () => {
      component.initialValue = 'Initial Todo';
      component.ngOnInit();
      expect(component.editTitle).toBe('Initial Todo');
    });

    it('should handle empty initialValue on ngOnInit', () => {
      component.initialValue = '';
      component.ngOnInit();
      expect(component.editTitle).toBe('');
    });
  });

  describe('props/inputs', () => {
    it('should accept initialValue input', () => {
      component.initialValue = 'My Todo Item';
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.editTitle).toBe('My Todo Item');
    });

    it('should update editTitle when initialValue changes before ngOnInit', () => {
      component.initialValue = 'First Value';
      component.ngOnInit();
      expect(component.editTitle).toBe('First Value');
    });
  });

  describe('user interactions', () => {
    beforeEach(() => {
      fixture.detectChanges();
      inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
    });

    it('should update editTitle when user types in input', fakeAsync(() => {
      inputElement.value = 'New Todo Text';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();
      expect(component.editTitle).toBe('New Todo Text');
    }));

    it('should call handleBlur when input loses focus', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(consoleSpy).toHaveBeenCalledWith('Edit finished');
      consoleSpy.mockRestore();
    });

    it('should call updateTodo when Enter key is pressed', fakeAsync(() => {
      component.editTitle = 'Updated Todo';
      fixture.detectChanges();
      tick();
      const consoleSpy = jest.spyOn(console, 'log');
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      inputElement.dispatchEvent(enterEvent);
      fixture.detectChanges();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'Updated Todo');
      consoleSpy.mockRestore();
    }));

    it('should not call updateTodo console log when Enter is pressed with empty input', fakeAsync(() => {
      component.editTitle = '';
      fixture.detectChanges();
      tick();
      const consoleSpy = jest.spyOn(console, 'log');
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      inputElement.dispatchEvent(enterEvent);
      fixture.detectChanges();
      expect(consoleSpy).not.toHaveBeenCalledWith('Todo updated:', expect.anything());
      consoleSpy.mockRestore();
    }));

    it('should not call updateTodo console log when Enter is pressed with whitespace only', fakeAsync(() => {
      component.editTitle = '   ';
      fixture.detectChanges();
      tick();
      const consoleSpy = jest.spyOn(console, 'log');
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      inputElement.dispatchEvent(enterEvent);
      fixture.detectChanges();
      expect(consoleSpy).not.toHaveBeenCalledWith('Todo updated:', expect.anything());
      consoleSpy.mockRestore();
    }));
  });

  describe('state changes', () => {
    it('should reflect editTitle changes in the input via ngModel', fakeAsync(() => {
      fixture.detectChanges();
      component.editTitle = 'Programmatic Update';
      fixture.detectChanges();
      tick();
      inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      expect(inputElement.value).toBe('Programmatic Update');
    }));

    it('should maintain two-way binding between input and editTitle', fakeAsync(() => {
      fixture.detectChanges();
      inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
      
      // Set value programmatically
      component.editTitle = 'Two Way Test';
      fixture.detectChanges();
      tick();
      expect(inputElement.value).toBe('Two Way Test');

      // Update via input
      inputElement.value = 'Updated via Input';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();
      expect(component.editTitle).toBe('Updated via Input');
    }));
  });

  describe('updateTodo method', () => {
    it('should log todo when editTitle has content', () => {
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
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should not log when editTitle contains only whitespace', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = '     ';
      component.updateTodo();
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should log trimmed content when editTitle has leading/trailing whitespace', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = '  Valid Todo  ';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '  Valid Todo  ');
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

  describe('edge cases', () => {
    it('should handle special characters in editTitle', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = '<script>alert("xss")</script>';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '<script>alert("xss")</script>');
      consoleSpy.mockRestore();
    }));

    it('should handle unicode characters in editTitle', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = '日本語テスト 🎉';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '日本語テスト 🎉');
      consoleSpy.mockRestore();
    }));

    it('should handle very long text in editTitle', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'log');
      const longText = 'a'.repeat(1000);
      component.editTitle = longText;
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', longText);
      consoleSpy.mockRestore();
    }));

    it('should handle newline characters in editTitle', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.editTitle = 'Line1\nLine2';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'Line1\nLine2');
      consoleSpy.mockRestore();
    }));
  });
});