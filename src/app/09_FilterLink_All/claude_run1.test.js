import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';
import { By } from '@angular/platform-browser';

/**
 * @jest-environment jsdom
 */
describe('FilterLinkAllComponent', () => {
  let component: FilterLinkAllComponent;
  let fixture: ComponentFixture<FilterLinkAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkAllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the link element with correct text', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement).toBeTruthy();
      expect(linkElement.nativeElement.textContent.trim()).toBe('All');
    });

    it('should have correct href attribute', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.getAttribute('href')).toBe('#/');
    });

    it('should have data-testid attribute', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.getAttribute('data-testid')).toBe('filter-link-all');
    });
  });

  describe('Props/Inputs', () => {
    it('should have isSelected default to false', () => {
      expect(component.isSelected).toBe(false);
    });

    it('should not have selected class when isSelected is false', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should have selected class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from false to true', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);

      component.isSelected = true;
      fixture.detectChanges();

      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from true to false', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);

      component.isSelected = false;
      fixture.detectChanges();

      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });
  });

  describe('User Interactions', () => {
    it('should call selectFilter method when link is clicked', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      linkElement.nativeElement.click();

      expect(selectFilterSpy).toHaveBeenCalled();
      expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    });

    it('should log message when selectFilter is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.selectFilter();

      expect(consoleSpy).toHaveBeenCalledWith('All filter selected');
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      consoleSpy.mockRestore();
    });

    it('should log message when link is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      linkElement.nativeElement.click();

      expect(consoleSpy).toHaveBeenCalledWith('All filter selected');

      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      linkElement.nativeElement.click();
      linkElement.nativeElement.click();
      linkElement.nativeElement.click();

      expect(selectFilterSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledTimes(3);

      consoleSpy.mockRestore();
    });
  });

  describe('State Changes', () => {
    it('should reflect isSelected state correctly in the DOM', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));

      // Initial state
      expect(component.isSelected).toBe(false);
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);

      // Change state
      component.isSelected = true;
      fixture.detectChanges();
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);

      // Change state back
      component.isSelected = false;
      fixture.detectChanges();
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should accept boolean input binding', () => {
      component.isSelected = true;
      expect(component.isSelected).toBe(true);

      component.isSelected = false;
      expect(component.isSelected).toBe(false);
    });
  });

  describe('Component Structure', () => {
    it('should be a standalone component', () => {
      const componentMetadata = (FilterLinkAllComponent as any).ɵcmp;
      expect(componentMetadata.standalone).toBe(true);
    });

    it('should have correct selector', () => {
      const componentMetadata = (FilterLinkAllComponent as any).ɵcmp;
      expect(componentMetadata.selectors[0][0]).toBe('app-filter-link-all');
    });
  });

  describe('Accessibility', () => {
    it('should be clickable', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.tagName.toLowerCase()).toBe('a');
    });

    it('should have accessible text content', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.textContent.trim()).toBeTruthy();
    });
  });
});