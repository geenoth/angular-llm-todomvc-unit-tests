import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';

/**
 * @jest-environment jsdom
 */

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestroyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a button element', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should have the "destroy" class on the button', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('destroy')).toBe(true);
    });

    it('should have the correct data-testid attribute', () => {
      const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      expect(button).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should call removeTodo when button is clicked', () => {
      const removeTodoSpy = jest.spyOn(component, 'removeTodo');
      const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      button.click();
      
      expect(removeTodoSpy).toHaveBeenCalled();
      expect(removeTodoSpy).toHaveBeenCalledTimes(1);
    });

    it('should log "Todo removed" when removeTodo is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      component.removeTodo();
      
      expect(consoleSpy).toHaveBeenCalledWith('Todo removed');
    });

    it('should handle multiple clicks', () => {
      const removeTodoSpy = jest.spyOn(component, 'removeTodo');
      const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      button.click();
      button.click();
      button.click();
      
      expect(removeTodoSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('removeTodo method', () => {
    it('should be defined', () => {
      expect(component.removeTodo).toBeDefined();
    });

    it('should be a function', () => {
      expect(typeof component.removeTodo).toBe('function');
    });

    it('should execute without throwing an error', () => {
      jest.spyOn(console, 'log').mockImplementation();
      expect(() => component.removeTodo()).not.toThrow();
    });
  });

  describe('Component metadata', () => {
    it('should be a standalone component', () => {
      const componentDef = (DestroyButtonComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });
});