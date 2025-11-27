import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainingCounterComponent } from './remaining-counter.component';
import { By } from '@angular/platform-browser';

/**
 * @jest-environment jsdom
 */

describe('RemainingCounterComponent', () => {
  let component: RemainingCounterComponent;
  let fixture: ComponentFixture<RemainingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemainingCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemainingCounterComponent);
    component = fixture.componentInstance;
  });

  describe('Component initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default count of 0', () => {
      expect(component.count).toBe(0);
    });
  });

  describe('Rendering', () => {
    it('should render the remaining counter with data-testid', () => {
      fixture.detectChanges();
      const counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement).toBeTruthy();
    });

    it('should display the count in a strong tag', () => {
      component.count = 5;
      fixture.detectChanges();
      const strongElement = fixture.debugElement.query(By.css('strong'));
      expect(strongElement.nativeElement.textContent).toBe('5');
    });

    it('should render with todo-count class', () => {
      fixture.detectChanges();
      const spanElement = fixture.debugElement.query(By.css('.todo-count'));
      expect(spanElement).toBeTruthy();
    });
  });

  describe('getLabel method', () => {
    it('should return "item" when count is 1', () => {
      component.count = 1;
      expect(component.getLabel()).toBe('item');
    });

    it('should return "items" when count is 0', () => {
      component.count = 0;
      expect(component.getLabel()).toBe('items');
    });

    it('should return "items" when count is 2', () => {
      component.count = 2;
      expect(component.getLabel()).toBe('items');
    });

    it('should return "items" when count is greater than 1', () => {
      component.count = 10;
      expect(component.getLabel()).toBe('items');
    });

    it('should return "items" for negative count', () => {
      component.count = -1;
      expect(component.getLabel()).toBe('items');
    });
  });

  describe('Template rendering with different counts', () => {
    it('should display "0 items left" when count is 0', () => {
      component.count = 0;
      fixture.detectChanges();
      const counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent.trim()).toContain('0');
      expect(counterElement.nativeElement.textContent).toContain('items left');
    });

    it('should display "1 item left" when count is 1', () => {
      component.count = 1;
      fixture.detectChanges();
      const counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent.trim()).toContain('1');
      expect(counterElement.nativeElement.textContent).toContain('item left');
    });

    it('should display "5 items left" when count is 5', () => {
      component.count = 5;
      fixture.detectChanges();
      const counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent.trim()).toContain('5');
      expect(counterElement.nativeElement.textContent).toContain('items left');
    });

    it('should display "100 items left" when count is 100', () => {
      component.count = 100;
      fixture.detectChanges();
      const counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent.trim()).toContain('100');
      expect(counterElement.nativeElement.textContent).toContain('items left');
    });
  });

  describe('Input property changes', () => {
    it('should update the display when count input changes', () => {
      component.count = 3;
      fixture.detectChanges();
      let strongElement = fixture.debugElement.query(By.css('strong'));
      expect(strongElement.nativeElement.textContent).toBe('3');

      component.count = 7;
      fixture.detectChanges();
      strongElement = fixture.debugElement.query(By.css('strong'));
      expect(strongElement.nativeElement.textContent).toBe('7');
    });

    it('should update label from items to item when count changes from 2 to 1', () => {
      component.count = 2;
      fixture.detectChanges();
      let counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent).toContain('items left');

      component.count = 1;
      fixture.detectChanges();
      counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent).toContain('item left');
      expect(counterElement.nativeElement.textContent).not.toContain('items left');
    });

    it('should update label from item to items when count changes from 1 to 0', () => {
      component.count = 1;
      fixture.detectChanges();
      let counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent).toContain('item left');

      component.count = 0;
      fixture.detectChanges();
      counterElement = fixture.debugElement.query(
        By.css('[data-testid="remaining-counter"]')
      );
      expect(counterElement.nativeElement.textContent).toContain('items left');
    });
  });

  describe('Edge cases', () => {
    it('should handle large numbers', () => {
      component.count = 999999;
      fixture.detectChanges();
      const strongElement = fixture.debugElement.query(By.css('strong'));
      expect(strongElement.nativeElement.textContent).toBe('999999');
      expect(component.getLabel()).toBe('items');
    });

    it('should handle zero correctly', () => {
      component.count = 0;
      fixture.detectChanges();
      const strongElement = fixture.debugElement.query(By.css('strong'));
      expect(strongElement.nativeElement.textContent).toBe('0');
      expect(component.getLabel()).toBe('items');
    });
  });
});