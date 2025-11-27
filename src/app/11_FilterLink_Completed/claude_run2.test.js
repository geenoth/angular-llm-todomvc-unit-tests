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
      const link = fixture.debugElement.query(By.css('a'));
      expect(link).toBeTruthy();
      expect(link.nativeElement.getAttribute('href')).toBe('#/completed');
    });

    it('should have the correct data-testid attribute', () => {
      const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
      expect(link).toBeTruthy();
    });

    it('should display "Completed" text', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.textContent.trim()).toBe('Completed');
    });
  });

  describe('Props/Inputs', () => {
    it('should have isSelected default to false', () => {
      expect(component.isSelected).toBe(false);
    });

    it('should not have selected class when isSelected is false', () => {
      component.isSelected = false;
      fixture.detectChanges();
      
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should have selected class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();
      
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from false to true', () => {
      component.isSelected = false;
      fixture.detectChanges();
      
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.classList.contains('selected')).toBe(false);
      
      component.isSelected = true;
      fixture.detectChanges();
      
      expect(link.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update class when isSelected changes from true to false', () => {
      component.isSelected = true;
      fixture.detectChanges();
      
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.classList.contains('selected')).toBe(true);
      
      component.isSelected = false;
      fixture.detectChanges();
      
      expect(link.nativeElement.classList.contains('selected')).toBe(false);
    });
  });

  describe('User Interactions', () => {
    it('should call selectFilter when link is clicked', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      
      const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
      link.triggerEventHandler('click', null);
      
      expect(selectFilterSpy).toHaveBeenCalled();
      expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    });

    it('should log message when selectFilter is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      component.selectFilter();
      
      expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');
      
      consoleSpy.mockRestore();
    });

    it('should call selectFilter multiple times on multiple clicks', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      
      const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
      link.triggerEventHandler('click', null);
      link.triggerEventHandler('click', null);
      link.triggerEventHandler('click', null);
      
      expect(selectFilterSpy).toHaveBeenCalledTimes(3);
    });

    it('should log message on each click', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
      link.triggerEventHandler('click', null);
      link.triggerEventHandler('click', null);
      
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Completed filter selected');
      expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Completed filter selected');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Native Element Click', () => {
    it('should trigger selectFilter on native click event', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      
      const link = fixture.debugElement.query(By.css('a')).nativeElement;
      link.click();
      
      expect(selectFilterSpy).toHaveBeenCalled();
    });
  });

  describe('Component State', () => {
    it('should maintain isSelected state after click', () => {
      component.isSelected = true;
      fixture.detectChanges();
      
      const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
      link.triggerEventHandler('click', null);
      fixture.detectChanges();
      
      expect(component.isSelected).toBe(true);
      expect(link.nativeElement.classList.contains('selected')).toBe(true);
    });
  });
});