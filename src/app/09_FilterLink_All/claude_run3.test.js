import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterLinkAllComponent } from './filter-link-all.component';

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

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render an anchor element with data-testid="filter-link-all"', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement).toBeTruthy();
      expect(linkElement.nativeElement.tagName).toBe('A');
    });

    it('should render "All" as the link text', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.textContent.trim()).toBe('All');
    });

    it('should have href="#/"', () => {
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.getAttribute('href')).toBe('#/');
    });
  });

  describe('Props/Inputs', () => {
    it('should have isSelected default to false', () => {
      expect(component.isSelected).toBe(false);
    });

    it('should not have "selected" class when isSelected is false', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
    });

    it('should have "selected" class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update "selected" class when isSelected changes from false to true', () => {
      component.isSelected = false;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
      expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);

      component.isSelected = true;
      fixture.detectChanges();

      expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should update "selected" class when isSelected changes from true to false', () => {
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

    it('should log "All filter selected" when link is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));

      linkElement.triggerEventHandler('click', null);

      expect(consoleSpy).toHaveBeenCalledWith('All filter selected');
      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks', () => {
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));

      linkElement.triggerEventHandler('click', null);
      linkElement.triggerEventHandler('click', null);
      linkElement.triggerEventHandler('click', null);

      expect(selectFilterSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });
  });

  describe('State Changes', () => {
    it('should correctly bind isSelected input', () => {
      expect(component.isSelected).toBe(false);

      component.isSelected = true;
      expect(component.isSelected).toBe(true);

      component.isSelected = false;
      expect(component.isSelected).toBe(false);
    });
  });
});