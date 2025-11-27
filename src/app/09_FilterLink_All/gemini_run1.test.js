import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';

describe('FilterLinkAllComponent', () => {
  let component: FilterLinkAllComponent;
  let fixture: ComponentFixture<FilterLinkAllComponent>;
  let linkElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkAllComponent], // Import standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial data binding
    linkElement = fixture.nativeElement.querySelector('[data-testid="filter-link-all"]');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "All" link correctly', () => {
    expect(linkElement).toBeTruthy();
    expect(linkElement.textContent?.trim()).toBe('All');
    expect(linkElement.getAttribute('href')).toBe('#/');
  });

  it('should not have the "selected" class when isSelected is false (default)', () => {
    expect(component.isSelected).toBe(false);
    expect(linkElement.classList.contains('selected')).toBe(false);
  });

  it('should have the "selected" class when isSelected input is true', () => {
    component.isSelected = true;
    fixture.detectChanges(); // Apply input change to the template
    expect(linkElement.classList.contains('selected')).toBe(true);
  });

  it('should call the selectFilter method on click', () => {
    const selectFilterSpy = jest.spyOn(component, 'selectFilter');
    linkElement.click();
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });

  it('should log a message to the console when selectFilter is called', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    component.selectFilter();
    expect(consoleLogSpy).toHaveBeenCalledWith('All filter selected');
    consoleLogSpy.mockRestore(); // Clean up spy after test
  });
});