import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkCompletedComponent', () => {
  let component: FilterLinkCompletedComponent;
  let fixture: ComponentFixture<FilterLinkCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterLinkCompletedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link with "Completed" text', () => {
    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-completed"]')
    );
    expect(linkElement.nativeElement.textContent.trim()).toBe('Completed');
  });

  it('should apply selected class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-completed"]')
    );
    expect(linkElement.nativeElement.classList).toContain('selected');
  });

  it('should not apply selected class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-completed"]')
    );
    expect(linkElement.nativeElement.classList).not.toContain('selected');
  });

  it('should call selectFilter and log when link is clicked', () => {
    const spy = jest.spyOn(component, 'selectFilter');
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-completed"]')
    );
    linkElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');

    consoleSpy.mockRestore();
  });

  it('should prevent default action on click', () => {
    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-completed"]')
    );

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    linkElement.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });
});