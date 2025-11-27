import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';

describe('FilterLinkCompletedComponent', () => {
  let component: FilterLinkCompletedComponent;
  let fixture: ComponentFixture<FilterLinkCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkCompletedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link with correct text', () => {
    const linkElement = fixture.debugElement.query(By.css('a[data-testid="filter-link-completed"]'));
    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.textContent.trim()).toBe('Completed');
  });

  it('should apply "selected" class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a[data-testid="filter-link-completed"]'));
    expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
  });

  it('should not apply "selected" class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a[data-testid="filter-link-completed"]'));
    expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
  });

  it('should call selectFilter on link click', () => {
    jest.spyOn(component, 'selectFilter');
    const linkElement = fixture.debugElement.query(By.css('a[data-testid="filter-link-completed"]'));
    linkElement.triggerEventHandler('click', null);
    expect(component.selectFilter).toHaveBeenCalled();
  });

  it('should log message when selectFilter is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.selectFilter();
    expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');
    consoleSpy.mockRestore();
  });

  it('should have correct href attribute', () => {
    const linkElement = fixture.debugElement.query(By.css('a[data-testid="filter-link-completed"]'));
    expect(linkElement.nativeElement.getAttribute('href')).toBe('#/completed');
  });
});