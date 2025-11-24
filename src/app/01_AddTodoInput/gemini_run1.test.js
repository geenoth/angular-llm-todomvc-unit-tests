import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  let component;
  let fixture;
  let inputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(
      By.css('[data-testid="add-todo-input"]')
    ).nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input field and the header', () => {
    const h1Element = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1Element.textContent).toBe('todos');
    expect(inputElement).toBeTruthy();
    expect(inputElement.placeholder).toBe('What needs to be done?');
  });

  it('should bind the input value to the title property', async () => {
    const testValue = 'New Todo';
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.title).toBe(testValue);
  });

  it('should call addTodo when Enter key is pressed', () => {
    jest.spyOn(component, 'addTodo');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(event);
    expect(component.addTodo).toHaveBeenCalled();
  });

  it('should not call addTodo on other key presses', () => {
    jest.spyOn(component, 'addTodo');
    const event = new KeyboardEvent('keyup', { key: 'a' });
    inputElement.dispatchEvent(event);
    expect(component.addTodo).not.toHaveBeenCalled();
  });

  describe('addTodo method', () => {
    it('should clear the title and log to console if title is not empty', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const testTitle = 'A valid todo';
      component.title = testTitle;
      fixture.detectChanges();
      await fixture.whenStable();

      component.addTodo();

      expect(consoleSpy).toHaveBeenCalledWith('Todo added:', testTitle);
      expect(component.title).toBe('');
    });

    it('should handle titles with only spaces and not add a todo', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const testTitle = '   ';
      component.title = testTitle;
      fixture.detectChanges();
      await fixture.whenStable();

      component.addTodo();

      expect(consoleSpy).not.toHaveBeenCalled();
      expect(component.title).toBe(testTitle);
    });

    it('should not do anything if the title is empty', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.title = '';
      fixture.detectChanges();
      await fixture.whenStable();

      component.addTodo();

      expect(consoleSpy).not.toHaveBeenCalled();
      expect(component.title).toBe('');
    });

    it('should trim the title before adding', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const testTitleWithSpaces = '  Trim this todo  ';
        const trimmedTitle = 'Trim this todo';
        component.title = testTitleWithSpaces;
        fixture.detectChanges();
        await fixture.whenStable();

        component.addTodo();

        expect(consoleSpy).toHaveBeenCalledWith('Todo added:', trimmedTitle);
        expect(component.title).toBe('');
    });
  });

  it('should clear the input field after adding a todo via Enter key', async () => {
    const testValue = 'Finish tests';
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.title).toBe('');
    expect(inputElement.value).toBe('');
  });
});