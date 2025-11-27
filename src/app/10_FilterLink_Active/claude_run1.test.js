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

  describe('rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a link with correct href', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link).toBeTruthy();
      expect(link.nativeElement.getAttribute('href')).toBe('#/active');
    });

    it('should render a link with data-testid attribute', () => {
      const link = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
      expect(link).toBeTruthy();
    });

    it('should render "Active" text inside the link', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.textContent.trim()).toBe('Active');
    });
  });

  describe('props and state', () => {
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

    it('should update selected class when isSelected changes from false to true', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.classList.contains('selected')).toBe(false);

      component.isSelected = true;
      fixture.detectChanges();

      expect(link.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update selected class when isSelected changes from true to false', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.classList.contains('selected')).toBe(true);

      component.isSelected = false;
      fixture.detectChanges();

      expect(link.nativeElement.classList.contains('selected')).toBe(false);
    });
  });

  describe('user interactions', () => {
    it('should call selectFilter when link is clicked', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      
      const link = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
      link.triggerEventHandler('click', null);

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

      const link = fixture.debugElement.query(By.css('a'));
      link.triggerEventHandler('click', null);

      expect(consoleSpy).toHaveBeenCalledWith('Active filter selected');

      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const link = fixture.debugElement.query(By.css('a'));
      link.triggerEventHandler('click', null);
      link.triggerEventHandler('click', null);
      link.triggerEventHandler('click', null);

      expect(selectFilterSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledTimes(3);

      consoleSpy.mockRestore();
    });
  });

  describe('input binding', () => {
    it('should accept isSelected input as true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      expect(component.isSelected).toBe(true);
    });

    it('should accept isSelected input as false', () => {
      component.isSelected = false;
      fixture.detectChanges();

      expect(component.isSelected).toBe(false);
    });
  });

  describe('component metadata', () => {
    it('should be a standalone component', () => {
      const componentDef = (FilterLinkActiveComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });
});