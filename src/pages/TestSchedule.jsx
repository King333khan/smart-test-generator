import React, { useState } from 'react';
import { CalendarDays, Clock, Plus, Trash2, Edit2, Check, X, BookOpen, Bell, Tag, Printer } from 'lucide-react';
import './TestSchedule.css';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Computer Science', 'Islamiat', 'Pakistan Studies'];
const STATUS_OPTIONS = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

const STATUS_COLORS = {
  Upcoming: 'status-upcoming',
  Ongoing: 'status-ongoing',
  Completed: 'status-completed',
  Cancelled: 'status-cancelled',
};

const INITIAL_SCHEDULES = [
  {
    id: 1,
    title: 'Mid-Term Mathematics',
    subject: 'Mathematics',
    date: '2026-03-20',
    time: '09:00',
    duration: '3',
    status: 'Upcoming',
    note: 'Chapters 1-5 included. Bring calculator.',
    syllabus: 'Algebra, Quadratic Equations, Matrices, Sets & Functions',
  },
  {
    id: 2,
    title: 'Physics Unit Test',
    subject: 'Physics',
    date: '2026-03-18',
    time: '10:30',
    duration: '2',
    status: 'Completed',
    note: 'Laws of Motion & Thermodynamics.',
    syllabus: 'Newton\'s Laws of Motion, Thermodynamics Ch. 1-3',
  },
  {
    id: 3,
    title: 'English Essay Exam',
    subject: 'English',
    date: '2026-03-22',
    time: '08:00',
    duration: '2.5',
    status: 'Upcoming',
    note: 'Essay writing and comprehension.',
    syllabus: 'Essay Types, Comprehension, Paragraph Writing',
  },
];

const emptyForm = {
  title: '',
  subject: '',
  date: '',
  time: '',
  duration: '',
  status: 'Upcoming',
  note: '',
  syllabus: '',
};

const TestSchedule = () => {
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [filterStatus, setFilterStatus] = useState('All');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleFormChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.subject || !form.date || !form.time) return;

    if (editId !== null) {
      setSchedules(prev => prev.map(s => s.id === editId ? { ...form, id: editId } : s));
      setEditId(null);
    } else {
      const newId = Date.now();
      setSchedules(prev => [{ ...form, id: newId }, ...prev]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleEdit = (schedule) => {
    setForm({ ...schedule });
    setEditId(schedule.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    setConfirmDelete(null);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const filtered = filterStatus === 'All'
    ? schedules
    : schedules.filter(s => s.status === filterStatus);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PK', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  };

  const totalUpcoming = schedules.filter(s => s.status === 'Upcoming').length;
  const totalCompleted = schedules.filter(s => s.status === 'Completed').length;
  const totalOngoing = schedules.filter(s => s.status === 'Ongoing').length;

  return (
    <div className="ts-container fade-in">

      {/* ===== SCREEN-ONLY SECTION ===== */}
      <div className="no-print">
        <div className="ts-header">
          <div>
            <h1><CalendarDays size={28} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />Test Schedule</h1>
            <p className="text-muted">Plan and manage your upcoming tests and examinations.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={handlePrint}>
              <Printer size={18} /> Print Schedule
            </button>
            <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}>
              <Plus size={18} /> Add Schedule
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="ts-stats">
          <div className="ts-stat-card glass">
            <Bell size={22} className="stat-icon upcoming-icon" />
            <div>
              <div className="stat-number">{totalUpcoming}</div>
              <div className="stat-label">Upcoming</div>
            </div>
          </div>
          <div className="ts-stat-card glass">
            <Clock size={22} className="stat-icon ongoing-icon" />
            <div>
              <div className="stat-number">{totalOngoing}</div>
              <div className="stat-label">Ongoing</div>
            </div>
          </div>
          <div className="ts-stat-card glass">
            <Check size={22} className="stat-icon completed-icon" />
            <div>
              <div className="stat-number">{totalCompleted}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
          <div className="ts-stat-card glass">
            <BookOpen size={22} className="stat-icon total-icon" />
            <div>
              <div className="stat-number">{schedules.length}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="ts-form-card glass slide-up">
            <h2 className="ts-form-title">{editId !== null ? 'Edit Schedule' : 'Add New Schedule'}</h2>
            <form onSubmit={handleSubmit} className="ts-form">
              <div className="ts-form-row">
                <div className="ts-form-group">
                  <label>Test Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Mid-Term Mathematics"
                    value={form.title}
                    onChange={e => handleFormChange('title', e.target.value)}
                    required
                  />
                </div>
                <div className="ts-form-group">
                  <label>Subject *</label>
                  <select
                    className="form-select"
                    value={form.subject}
                    onChange={e => handleFormChange('subject', e.target.value)}
                    required
                  >
                    <option value="">Select Subject</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="ts-form-row">
                <div className="ts-form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={form.date}
                    onChange={e => handleFormChange('date', e.target.value)}
                    required
                  />
                </div>
                <div className="ts-form-group">
                  <label>Time *</label>
                  <input
                    type="time"
                    className="form-input"
                    value={form.time}
                    onChange={e => handleFormChange('time', e.target.value)}
                    required
                  />
                </div>
                <div className="ts-form-group">
                  <label>Duration (hours)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 3"
                    min="0.5"
                    max="6"
                    step="0.5"
                    value={form.duration}
                    onChange={e => handleFormChange('duration', e.target.value)}
                  />
                </div>
              </div>

              <div className="ts-form-row">
                <div className="ts-form-group ts-form-group--wide">
                  <label>Syllabus / Topics</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Chapter 1-5, Algebra, Laws of Motion..."
                    value={form.syllabus}
                    onChange={e => handleFormChange('syllabus', e.target.value)}
                  />
                </div>
                <div className="ts-form-group">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={form.status}
                    onChange={e => handleFormChange('status', e.target.value)}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="ts-form-row">
                <div className="ts-form-group ts-form-group--wide">
                  <label>Notes</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Optional: additional instructions..."
                    value={form.note}
                    onChange={e => handleFormChange('note', e.target.value)}
                  />
                </div>
              </div>

              <div className="ts-form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  <X size={16} /> Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} /> {editId !== null ? 'Update Schedule' : 'Save Schedule'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="ts-filter-tabs">
          {['All', ...STATUS_OPTIONS].map(status => (
            <button
              key={status}
              className={`ts-tab ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Schedule Cards */}
        <div className="ts-grid">
          {filtered.length > 0 ? filtered.map(schedule => (
            <div key={schedule.id} className="ts-card glass slide-up">
              <div className="ts-card-top">
                <div className="ts-card-title-row">
                  <h3>{schedule.title}</h3>
                  <span className={`ts-badge ${STATUS_COLORS[schedule.status]}`}>{schedule.status}</span>
                </div>
                <div className="ts-card-subject">
                  <Tag size={14} />
                  <span>{schedule.subject}</span>
                </div>
              </div>

              <div className="ts-card-meta">
                <div className="ts-meta-item">
                  <CalendarDays size={15} />
                  <span>{formatDate(schedule.date)}</span>
                </div>
                <div className="ts-meta-item">
                  <Clock size={15} />
                  <span>{formatTime(schedule.time)}{schedule.duration ? ` · ${schedule.duration}h` : ''}</span>
                </div>
                {schedule.syllabus && (
                  <div className="ts-meta-item">
                    <BookOpen size={15} />
                    <span>{schedule.syllabus}</span>
                  </div>
                )}
              </div>

              {schedule.note && (
                <div className="ts-card-note">
                  <BookOpen size={13} />
                  <span>{schedule.note}</span>
                </div>
              )}

              <div className="ts-card-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(schedule)}>
                  <Edit2 size={15} /> Edit
                </button>
                {confirmDelete === schedule.id ? (
                  <div className="ts-confirm-delete">
                    <span>Delete?</span>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(schedule.id)}>Yes</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setConfirmDelete(null)}>No</button>
                  </div>
                ) : (
                  <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(schedule.id)}>
                    <Trash2 size={15} /> Delete
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className="empty-state">
              <CalendarDays size={48} className="text-muted" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>No schedules found</h3>
              <p className="text-muted">
                {filterStatus !== 'All' ? `No "${filterStatus}" tests.` : 'Click "Add Schedule" to create your first test schedule.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ===== PRINT-ONLY SECTION ===== */}
      <div className="print-only">
        <div className="print-header">
          <h1 className="print-title">Test Schedule</h1>
          <p className="print-subtitle">Academic Examination Timetable</p>
          <div className="print-meta">
            <span>Total Tests: <strong>{schedules.length}</strong></span>
            <span>Printed on: <strong>{new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
          </div>
        </div>

        <table className="print-table">
          <thead>
            <tr>
              <th className="col-no">Test No.</th>
              <th className="col-date">Date &amp; Time</th>
              <th className="col-subject">Subject</th>
              <th className="col-syllabus">Syllabus / Topics</th>
              <th className="col-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={schedule.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td className="col-no">{index + 1}</td>
                <td className="col-date">
                  <div className="print-date">{formatDate(schedule.date)}</div>
                  <div className="print-time">{formatTime(schedule.time)}{schedule.duration ? ` (${schedule.duration}h)` : ''}</div>
                </td>
                <td className="col-subject">
                  <strong>{schedule.subject}</strong>
                  <div className="print-test-title">{schedule.title}</div>
                </td>
                <td className="col-syllabus">
                  {schedule.syllabus || <span className="na-text">—</span>}
                  {schedule.note && <div className="print-note">Note: {schedule.note}</div>}
                </td>
                <td className="col-status">
                  <span className={`print-badge ${STATUS_COLORS[schedule.status]}`}>{schedule.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="print-footer">
          <div className="print-sig">
            <span>Prepared by: ___________________________</span>
            <span>Signature: ___________________________</span>
          </div>
          <p className="print-footer-note">Smart Test Generator &mdash; Academic Schedule</p>
        </div>
      </div>

    </div>
  );
};

export default TestSchedule;
