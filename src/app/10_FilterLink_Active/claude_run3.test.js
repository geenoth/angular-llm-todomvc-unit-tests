import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterLinkActiveComponent } from './filter-link-active.component';

describe('FilterLinkActiveComponent', () => {
  let component: FilterLinkActiveComponent;
  let fixture: ComponentFixture<FilterLinkActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkActiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render an anchor element with correct href', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement).toBeTruthy();
      expect(linkElement.nativeElement.getAttribute('href')).toBe('#/active');
    });

    it('should render with data-testid attribute', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
      expect(linkElement).toBeTruthy();
    });

    it('should display "Active" text', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.textContent.trim()).toBe('Active');
    });
  });

  describe('Props/Inputs', () => {
    it('should have isSelected default to false', () => {
      expect(component.isSelected).toBe(false);
    });

    it('should not have selected class when isSelected is false', () => {
      component.isSelected = false;
      fixture.detectChanges();
      
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should have selected class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();
      
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from false to true', () => {
      component.isSelected = false;
      fixture.detectChanges();
      
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
      
      component.isSelected = true;
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from true to false', () => {
      component.isSelected = true;
      fixture.detectChanges();
      
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
      
      component.isSelected = false;
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });
  });

  describe('User Interactions', () => {
    it('should call selectFilter when link is clicked', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
      linkElement.triggerEventHandler('click', null);
      
      expect(selectFilterSpy).toHaveBeenCalled();
      expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    });

    it('should log message when selectFilter is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      component.selectFilter();
      
      expect(consoleSpy).toHaveBeenCalledWith('Active filter selected');
      
      consoleSpy.mockRestore();
    });

    it('should log message when link is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const linkElement = fixture.debugElement.query(By.css('a'));
      linkElement.triggerEventHandler('click', null);
      
      expect(consoleSpy).toHaveBeenCalledWith('Active filter selected');
      
      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const linkElement = fixture.debugElement.query(By.css('a'));
      
      linkElement.triggerEventHandler('click', null);
      linkElement.triggerEventHandler('click', null);
      linkElement.triggerEventHandler('click', null);
      
      expect(selectFilterSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      
      consoleSpy.mockRestore();
    });
  });

  describe('State Changes', () => {
    it('should maintain isSelected state after click', () => {
      component.isSelected = true;
      fixture.detectChanges();
      
      const linkElement = fixture.debugElement.query(By.css('a'));
      linkElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      
      expect(component.isSelected).toBe(true);
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should reflect external state changes', () => {
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

  describe('Component Structure', () => {
    it('should be a standalone component', () => {
      const componentDef = (FilterLinkActiveComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });

    it('should have correct selector', () => {
      const componentDef = (FilterLinkActiveComponent as any).ɵcmp;
      expect(componentDef.selectors[0][0]).toBe('app-filter-link-active');
    });
  });
});