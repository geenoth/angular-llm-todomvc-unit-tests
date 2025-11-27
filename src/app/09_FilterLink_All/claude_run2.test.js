import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';
import { By } from '@angular/platform-browser';

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

  describe('rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render an anchor element with correct href', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement).toBeTruthy();
      expect(linkElement.nativeElement.getAttribute('href')).toBe('#/');
    });

    it('should have data-testid attribute "filter-link-all"', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement).toBeTruthy();
    });

    it('should display "All" text', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.textContent.trim()).toBe('All');
    });
  });

  describe('isSelected input property', () => {
    it('should have isSelected default to false', () => {
      expect(component.isSelected).toBe(false);
    });

    it('should not have "selected" class when isSelected is false', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should have "selected" class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should toggle "selected" class when isSelected changes', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));

      component.isSelected = false;
      fixture.detectChanges();
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);

      component.isSelected = true;
      fixture.detectChanges();
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);

      component.isSelected = false;
      fixture.detectChanges();
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });
  });

  describe('user interactions', () => {
    it('should call selectFilter when link is clicked', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));

      linkElement.triggerEventHandler('click', null);

      expect(selectFilterSpy).toHaveBeenCalled();
      expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    });

    it('should log "All filter selected" when selectFilter is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.selectFilter();

      expect(consoleSpy).toHaveBeenCalledWith('All filter selected');

      consoleSpy.mockRestore();
    });

    it('should log to console when link is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));

      linkElement.triggerEventHandler('click', null);

      expect(consoleSpy).toHaveBeenCalledWith('All filter selected');

      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));

      linkElement.triggerEventHandler('click', null);
      linkElement.triggerEventHandler('click', null);
      linkElement.triggerEventHandler('click', null);

      expect(selectFilterSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('component integration', () => {
    it('should work correctly with isSelected true and click', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);

      linkElement.triggerEventHandler('click', null);
      expect(consoleSpy).toHaveBeenCalledWith('All filter selected');

      consoleSpy.mockRestore();
    });

    it('should work correctly with isSelected false and click', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);

      linkElement.triggerEventHandler('click', null);
      expect(consoleSpy).toHaveBeenCalledWith('All filter selected');

      consoleSpy.mockRestore();
    });
  });

  describe('standalone component', () => {
    it('should be a standalone component', () => {
      const componentMetadata = (FilterLinkAllComponent as any).ɵcmp;
      expect(componentMetadata.standalone).toBe(true);
    });
  });
});