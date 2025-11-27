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

    it('should render "Completed" text content', () => {
      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.textContent.trim()).toBe('Completed');
    });

    it('should have data-testid attribute', () => {
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

    it('should not have selected class when isSelected is false', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should have selected class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update selected class when isSelected changes from false to true', () => {
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

    it('should update selected class when isSelected changes from true to false', () => {
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

    it('should log correct message when selectFilter is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.selectFilter();

      expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');
      consoleSpy.mockRestore();
    });

    it('should log correct message when link is clicked', () => {
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

  describe('Component State', () => {
    it('should maintain isSelected state after click', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      linkElement.nativeElement.click();

      expect(component.isSelected).toBe(true);
    });

    it('should be standalone component', () => {
      const componentMetadata = (FilterLinkCompletedComponent as any).ɵcmp;
      expect(componentMetadata.standalone).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should be an anchor element', () => {
      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.tagName.toLowerCase()).toBe('a');
    });

    it('should have accessible text content', () => {
      const linkElement = fixture.debugElement.query(
        By.css('[data-testid="filter-link-completed"]')
      );
      expect(linkElement.nativeElement.textContent.trim()).toBeTruthy();
    });
  });
});