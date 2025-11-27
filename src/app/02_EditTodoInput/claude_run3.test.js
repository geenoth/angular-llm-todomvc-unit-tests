import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty initialValue by default', () => {
      expect(component.initialValue).toBe('');
    });

    it('should have empty editTitle by default', () => {
      expect(component.editTitle).toBe('');
    });

    it('should set editTitle to initialValue on ngOnInit', () => {
      component.initialValue = 'Test Todo';
      component.ngOnInit();
      expect(component.editTitle).toBe('Test Todo');
    });

    it('should set editTitle to empty string when initialValue is empty', () => {
      component.initialValue = '';
      component.ngOnInit();
      expect(component.editTitle).toBe('');
    });
  });

  describe('Input Property', () => {
    it('should accept initialValue input', () => {
      component.initialValue = 'My Todo Item';
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.editTitle).toBe('My Todo Item');
    });

    it('should handle special characters in initialValue', () => {
      component.initialValue = 'Todo with special chars: @#$%^&*()';
      component.ngOnInit();
      expect(component.editTitle).toBe('Todo with special chars: @#$%^&*()');
    });

    it('should handle long text in initialValue', () => {
      const longText = 'A'.repeat(1000);
      component.initialValue = longText;
      component.ngOnInit();
      expect(component.editTitle).toBe(longText);
    });
  });

  describe('updateTodo method', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should log todo when editTitle has content', () => {
      component.editTitle = 'Updated Todo';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'Updated Todo');
    });

    it('should not log when editTitle is empty', () => {
      component.editTitle = '';
      component.updateTodo();
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when editTitle contains only whitespace', () => {
      component.editTitle = '   ';
      component.updateTodo();
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when editTitle contains only tabs', () => {
      component.editTitle = '\t\t\t';
      component.updateTodo();
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when editTitle contains only newlines', () => {
      component.editTitle = '\n\n\n';
      component.updateTodo();
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should log when editTitle has content with leading/trailing whitespace', () => {
      component.editTitle = '  Valid Todo  ';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '  Valid Todo  ');
    });

    it('should log when editTitle has single character', () => {
      component.editTitle = 'a';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'a');
    });
  });

  describe('handleBlur method', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should log "Edit finished" when called', () => {
      component.handleBlur();
      expect(consoleSpy).toHaveBeenCalledWith('Edit finished');
    });

    it('should log regardless of editTitle value', () => {
      component.editTitle = 'Some value';
      component.handleBlur();
      expect(consoleSpy).toHaveBeenCalledWith('Edit finished');
    });

    it('should log when editTitle is empty', () => {
      component.editTitle = '';
      component.handleBlur();
      expect(consoleSpy).toHaveBeenCalledWith('Edit finished');
    });
  });

  describe('Component Rendering', () => {
    it('should render without errors', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should initialize with provided initialValue after detectChanges', () => {
      component.initialValue = 'Initial Todo';
      fixture.detectChanges();
      expect(component.editTitle).toBe('Initial Todo');
    });
  });

  describe('State Changes', () => {
    it('should allow editTitle to be modified', () => {
      component.editTitle = 'First Value';
      expect(component.editTitle).toBe('First Value');
      
      component.editTitle = 'Second Value';
      expect(component.editTitle).toBe('Second Value');
    });

    it('should maintain editTitle independently of initialValue after init', () => {
      component.initialValue = 'Initial';
      component.ngOnInit();
      
      component.editTitle = 'Modified';
      expect(component.editTitle).toBe('Modified');
      expect(component.initialValue).toBe('Initial');
    });

    it('should reset editTitle when ngOnInit is called again', () => {
      component.initialValue = 'First';
      component.ngOnInit();
      component.editTitle = 'Modified';
      
      component.initialValue = 'Second';
      component.ngOnInit();
      expect(component.editTitle).toBe('Second');
    });
  });

  describe('Edge Cases', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should handle unicode characters', () => {
      component.editTitle = '日本語テスト 🎉';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '日本語テスト 🎉');
    });

    it('should handle emoji-only content', () => {
      component.editTitle = '🚀🎯✨';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '🚀🎯✨');
    });

    it('should handle mixed whitespace and content', () => {
      component.editTitle = '  \t valid \n  ';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '  \t valid \n  ');
    });

    it('should handle numeric strings', () => {
      component.editTitle = '12345';
      component.updateTodo();
      expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', '12345');
    });
  });

  describe('Lifecycle', () => {
    it('should call ngOnInit during fixture.detectChanges', () => {
      const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
      component.initialValue = 'Test';
      fixture.detectChanges();
      expect(ngOnInitSpy).toHaveBeenCalled();
    });
  });
});