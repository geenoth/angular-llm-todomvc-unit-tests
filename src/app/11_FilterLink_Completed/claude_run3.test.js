import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';

describe('FilterLinkCompletedComponent', () => {
  let component: FilterLinkCompletedComponent;
  let fixture: ComponentFixture<FilterLinkCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkCompletedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render an anchor element with correct href', () => {
      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement).toBeTruthy();
      expect(linkElement.nativeElement.getAttribute('href')).toBe('#/completed');
    });

    it('should render with text "Completed"', () => {
      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.textContent.trim()).toBe('Completed');
    });

    it('should have data-testid attribute set to "filter-link-completed"', () => {
      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.getAttribute('data-testid')).toBe(
        'filter-link-completed'
      );
    });
  });

  describe('Props/Inputs', () => {
    it('should have isSelected default to false', () => {
      expect(component.isSelected).toBe(false);
    });

    it('should not have "selected" class when isSelected is false', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should have "selected" class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from false to true', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);

      component.isSelected = true;
      fixture.detectChanges();

      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from true to false', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);

      component.isSelected = false;
      fixture.detectChanges();

      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });
  });

  describe('User Interactions', () => {
    it('should call selectFilter when link is clicked', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      linkElement.nativeElement.click();

      expect(selectFilterSpy).toHaveBeenCalled();
      expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    });

    it('should log "Completed filter selected" when selectFilter is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.selectFilter();

      expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      consoleSpy.mockRestore();
    });

    it('should log message when link is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      linkElement.nativeElement.click();

      expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');

      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );

      linkElement.nativeElement.click();
      linkElement.nativeElement.click();
      linkElement.nativeElement.click();

      expect(selectFilterSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledTimes(3);

      consoleSpy.mockRestore();
    });
  });

  describe('Component Methods', () => {
    it('should have selectFilter method defined', () => {
      expect(component.selectFilter).toBeDefined();
      expect(typeof component.selectFilter).toBe('function');
    });

    it('should execute selectFilter without throwing errors', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      expect(() => component.selectFilter()).not.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid isSelected changes', () => {
      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );

      for (let i = 0; i < 10; i++) {
        component.isSelected = i % 2 === 0;
        fixture.detectChanges();
        expect(linkElement.nativeElement.classList.contains('selected')).toBe(
          i % 2 === 0
        );
      }
    });

    it('should maintain correct state after multiple interactions', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      linkElement.nativeElement.click();

      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');

      consoleSpy.mockRestore();
    });
  });
});