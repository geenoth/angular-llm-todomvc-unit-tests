import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterLinkActiveComponent } from './filter-link-active.component';

describe('FilterLinkActiveComponent', () => {
  let component: FilterLinkActiveComponent;
  let fixture: ComponentFixture<FilterLinkActiveComponent>;
  let linkElement: HTMLAnchorElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkActiveComponent], // Import standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkActiveComponent);
    component = fixture.componentInstance;
    // Query for the link element by its data-testid
    linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-active"]')
    ).nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render the link with the text "Active"', () => {
      fixture.detectChanges();
      expect(linkElement.textContent).toContain('Active');
    });

    it('should have the correct href attribute', () => {
      fixture.detectChanges();
      // Use getAttribute to check the full href value
      expect(linkElement.getAttribute('href')).toBe('#/active');
    });
  });

  describe('Props and State Changes', () => {
    it('should not have the "selected" class by default when isSelected is false', () => {
      fixture.detectChanges();
      expect(linkElement.classList.contains('selected')).toBe(false);
    });

    it('should have the "selected" class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges(); // Trigger change detection to apply the class
      expect(linkElement.classList.contains('selected')).toBe(true);
    });

    it('should remove the "selected" class when isSelected changes from true to false', () => {
      // Start with isSelected = true
      component.isSelected = true;
      fixture.detectChanges();
      expect(linkElement.classList.contains('selected')).toBe(true);

      // Change isSelected to false
      component.isSelected = false;
      fixture.detectChanges();
      expect(linkElement.classList.contains('selected')).toBe(false);
    });
  });

  describe('User Interactions', () => {
    it('should call selectFilter() method when the link is clicked', () => {
      // Spy on the component's method before the click
      const selectFilterSpy = jest.spyOn(component, 'selectFilter');
      fixture.detectChanges();

      linkElement.click(); // Simulate the click event

      expect(selectFilterSpy).toHaveBeenCalled();
      expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    });

    it('should log to the console when selectFilter is called', () => {
       // Spy on console.log to ensure the method's implementation is correct
      const consoleLogSpy = jest.spyOn(console, 'log');
      
      component.selectFilter(); // Call the method directly

      expect(consoleLogSpy).toHaveBeenCalledWith('Active filter selected');
      
      // Clean up the spy
      consoleLogSpy.mockRestore();
    });
  });
});