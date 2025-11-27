import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkAllComponent', () => {
  let component: FilterLinkAllComponent;
  let fixture: ComponentFixture<FilterLinkAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterLinkAllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link with "All" text', () => {
    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-all"]')
    );
    expect(linkElement.nativeElement.textContent.trim()).toBe('All');
  });

  it('should apply selected class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-all"]')
    );
    expect(linkElement.nativeElement.classList).toContain('selected');
  });

  it('should not apply selected class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-all"]')
    );
    expect(linkElement.nativeElement.classList).not.toContain('selected');
  });

  it('should call selectFilter and log when link is clicked', () => {
    const spy = jest.spyOn(component, 'selectFilter');
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-all"]')
    );
    linkElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('All filter selected');

    consoleSpy.mockRestore();
  });

  it('should prevent default action on click', () => {
    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-all"]')
    );

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    linkElement.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });
});